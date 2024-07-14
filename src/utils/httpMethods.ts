export enum supportedMethods {
  delete = "DELETE",
  get = "GET",
  head = "HEAD",
  patch = "PATCH",
  post = "POST",
  put = "PUT",
  options = "OPTIONS",
  propfind = "PROPFIND",
  proppatch = "PROPPATCH",
  mkcol = "MKCOL",
  copy = "COPY",
  move = "MOVE",
  lock = "LOCK",
  unlock = "UNLOCK",
  trace = "TRACE",
  search = "SEARCH",
}

export const bodylessMethods = new Set([
  // Standard
  'GET',
  'HEAD',
  'TRACE',

  // WebDAV
  'UNLOCK'
])

export const bodyMethods = new Set([
  // Standard
  'DELETE',
  'OPTIONS',
  'PATCH',
  'PUT',
  'POST',

  // // WebDAV
  // 'COPY',
  // 'LOCK',
  // 'MOVE',
  // 'MKCOL',
  // 'PROPFIND',
  // 'PROPPATCH',
  // 'REPORT',
  // 'SEARCH',
  // 'MKCALENDAR'
])
