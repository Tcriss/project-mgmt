import { Roles } from "../enums";

export interface PayloadTokenI {
    sub: string,
    role: Roles
}