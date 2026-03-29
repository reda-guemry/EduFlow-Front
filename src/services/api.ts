
type ApiOptions = {
    method?: string;
    headers?: Record<string, string>;
    data?: any;
}


export async function api<T>(endpoint: string, options: ApiOptions): Promise<T> {
    const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...options.headers,
        },
        credentials: 'include',
        body: options.data ? JSON.stringify(options.data) : undefined,
    });

    const result = await response.json();

    if (!response.ok) {
        if (result.errors) {
            const messages = Object.values(result.errors)
                .flat()
                .join(" | ");

            throw new Error(messages);
        }

        throw new Error(result.message || result.error || "Request failed");
    }

    return result;

};



