// Copied from https://github.com/department-stockholm/aws-signature-v4
// and fixed the sorting of query parameters by using 'query-string' package instead of 'querystring'

import crypto from 'crypto';

import querystring from 'query-string';

export const createCanonicalRequest = (method: any, pathname: any, query: any, headers: any, payload: any) => {
  return [
    method.toUpperCase(),
    pathname,
    createCanonicalQueryString(query),
    createCanonicalHeaders(headers),
    createSignedHeaders(headers),
    payload
  ].join('\n');
};

export const createCanonicalQueryString = (params: any) => {
  return Object.keys(params).sort().map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
};

export const createCanonicalHeaders = (headers: any) => {
  return Object.keys(headers).sort().map((name) => {
    return name.toLowerCase().trim() + ':' + headers[name].toString().trim() + '\n';
  }).join('');
};

export const createSignedHeaders = (headers: any) => {
  return Object.keys(headers).sort().map((name) => {
    return name.toLowerCase().trim();
  }).join(';');
};

export const createCredentialScope = (time: any, region: any, service: any) => {
  return [toDate(time), region, service, 'aws4_request'].join('/');
};

export const createStringToSign = (time: any, region: any, service: any, request: any) => {
  return [
    'AWS4-HMAC-SHA256',
    toTime(time),
    createCredentialScope(time, region, service),
    hash(request, 'hex')
  ].join('\n');
};

export const createSignature = (secret: any, time: any, region: any, service: any, stringToSign: any) => {
  const h1 = hmac('AWS4' + secret, toDate(time)); // date-key
  const h2 = hmac(h1, region); // region-key
  const h3 = hmac(h2, service); // service-key
  const h4 = hmac(h3, 'aws4_request'); // signing-key
  return hmac(h4, stringToSign, 'hex');
};

export const createPresignedS3URL = (name: any, options: any) => {
  options = options || {};
  options.method = options.method || 'GET';
  options.bucket = options.bucket || process.env.AWS_S3_BUCKET;
  return createPresignedURL(
    options.method,
    options.bucket + '.s3.amazonaws.com',
    '/' + name,
    's3',
    'UNSIGNED-PAYLOAD',
    options
  );
};

export const createPresignedURL = (method: any, host: any, path: any, service: any, payload: any, options: any) => {
  options = options || {};
  options.key = options.key || process.env.AWS_ACCESS_KEY_ID;
  options.secret = options.secret || process.env.AWS_SECRET_ACCESS_KEY;
  options.protocol = options.protocol || 'https';
  options.headers = options.headers || {};
  options.timestamp = options.timestamp || Date.now();
  options.region = options.region || process.env.AWS_REGION || 'us-east-1';
  options.expires = options.expires || 86400; // 24 hours
  options.headers = options.headers || {};

  // host is required
  options.headers.Host = host;

  const query = options.query ? querystring.parse(options.query) : {};
  query['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
  query['X-Amz-Credential'] = options.key + '/' +
    createCredentialScope(options.timestamp, options.region, service);
  query['X-Amz-Date'] = toTime(options.timestamp);
  query['X-Amz-Expires'] = options.expires;
  query['X-Amz-SignedHeaders'] = createSignedHeaders(options.headers);
  if (options.sessionToken) {
    query['X-Amz-Security-Token'] = options.sessionToken;
  }

  const canonicalRequest = createCanonicalRequest(method, path, query, options.headers, payload);
  const stringToSign = createStringToSign(options.timestamp, options.region, service, canonicalRequest);
  query['X-Amz-Signature'] = createSignature(options.secret, options.timestamp, options.region, service, stringToSign);
  return options.protocol + '://' + host + path + '?' + querystring.stringify(query);
};

function toTime(time: any) {
  // eslint-disable-next-line no-useless-escape
  return new Date(time).toISOString().replace(/[:\-]|\.\d{3}/g, '');
}

function toDate(time: any) {
  return toTime(time).substring(0, 8);
}

// tslint:disable-next-line:variable-name
function hmac(key: any, string: any, encoding?: any) {
  return crypto.createHmac('sha256', key)
    .update(string, 'utf8')
    .digest(encoding);
}

// tslint:disable-next-line:variable-name
function hash(string: any, encoding: any) {
  return crypto.createHash('sha256')
    .update(string, 'utf8')
    .digest(encoding);
}
