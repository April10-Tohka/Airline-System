import {showOnRoute} from "@/directives/show-on-route/show-on-route.js"

export function loadDirectives(app)
{
    app.directive("show-on-route",showOnRoute);
}
