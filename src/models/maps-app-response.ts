import { CvatResponse } from "./cvat-response";
import { Header } from "./header";

export interface MapsAppResponse {
    header: Header;
    data: CvatResponse;
}
