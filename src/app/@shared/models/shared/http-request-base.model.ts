export class HttpRequestBaseModel {
    success: boolean;
    message: string;
    data: any;

    constructor(
        _success: boolean,
        _message: string,
        _data: any,
    ) {
        this.success = _success;
        this.message = _message
        this.data = _data;
    }
}