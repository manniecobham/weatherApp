import { Get, JsonController } from "routing-controllers";


@JsonController("/working")

export class TestController {
    @Get()
    getOne() {
        return "Gotten One"
    }
}