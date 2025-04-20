// 가능한 쿼리 값 타입
export type QueryValue = string | number | boolean;
export type QueryParams = {
  [key: string]: QueryValue | undefined | null;
};

// 파싱된 쿼리 값 타입 (undefined/null은 없음)
export type ParsedQueryParams = {
  [key: string]: string | number | boolean;
};

// 쿼리스트링 변환 함수
export const createQueryStringFromObject = (
  queryParams: QueryParams
): string => {
  const queryString = Object.entries(queryParams)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

// 쿼리스트링을 객체로 변환하는 함수
export const parseSearchParamsToObject = (
  searchParams: string | URLSearchParams
): ParsedQueryParams => {
  const queryParams: ParsedQueryParams = {};
  const params =
    typeof searchParams === "string"
      ? new URLSearchParams(searchParams)
      : searchParams;

  for (const [key, value] of params.entries()) {
    let parsedValue: string | number | boolean = value;

    if (/^\d+$/.test(value)) {
      parsedValue = parseInt(value, 10);
    } else if (value === "true" || value === "false") {
      parsedValue = value === "true";
    }

    queryParams[key] = parsedValue;
  }

  return queryParams;
};

// URL 객체 변환 함수
export const parseUrlToQueryParams = (url: string | URL): ParsedQueryParams => {
  const parsedUrl = typeof url === "string" ? new URL(url) : url;
  return parseSearchParamsToObject(parsedUrl.searchParams);
};

