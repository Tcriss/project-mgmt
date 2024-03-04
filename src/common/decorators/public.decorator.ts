import { SetMetadata } from "@nestjs/common";

import { PUBLIC_KEY } from "../constants";

export const PublicAcces = () => SetMetadata(PUBLIC_KEY, true);