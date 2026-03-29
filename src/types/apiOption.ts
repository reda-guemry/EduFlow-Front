export type ApiOptions = {
    method?: string;
    headers?: Record<string, string>;
    retry?: boolean;
    accessToken? : string | null;
    body?: any;
}

