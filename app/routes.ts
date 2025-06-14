import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/home.layout.tsx", [
    index("routes/home.tsx"),
    route("search", "actions/search.tsx"),
    route(":user", "routes/github-user.tsx"),

  ])
] satisfies RouteConfig;
