import { AxiosResponse } from "axios";
import Page from "./Page";

type PageResponse = {
 page: Page
} & AxiosResponse

export default PageResponse