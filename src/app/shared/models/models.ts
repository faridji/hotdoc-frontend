interface GenericApiResponse {
    status: string,
    status_code: number,
    data: any,
    error_message: string;
} 

interface User {
    name: string;
    token: string;
    isAdmin: boolean;
}

interface RowAction {
    title: string,
    icon: string,
    action: string
}