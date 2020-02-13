import { MapView, Login, Projects } from "containers";


export const privateRouteList = [
    {path:'/', exact:true, component: MapView},
    {path:'/projects', exact:false, component: Projects}
]
export const publicRouteList = [
    {path:'/login', exact:false, component: Login},
]