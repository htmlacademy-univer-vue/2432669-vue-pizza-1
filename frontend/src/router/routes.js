export default [
    {
        path: '/',
        name: 'HomeView',
        component: () => import("../views/HomeView.vue"),
        meta: { layout: 'AppLayoutMain' },

    }, {
        path: '/login',
        name: 'LonginView',
        component: () => import("../views/LoginView.vue"),
        meta: { layout: "AppLayoutDefault" }
    },
    {
        path:'/cart',
        name:'CartView',
        component:()=>import("../views/CartView.vue"),
        meta:{ layout: 'AppLayoutMain' }
    },
    {
        path:'/user',
        name:'UserView',
        component:()=>import("../views/UserView.vue"),
        meta:{ layout: 'AppLayoutMain' }
    },
    {
        path:'/orders',
        name:'OrdersView',
        component:()=>import("../views/OrdersView.vue"),
        meta:{ layout: 'AppLayoutMain' }
    },{
        path:'/welcom',
        name:'ProfileView',
        component:()=>import("../views/ProfileView.vue"),
        meta:{ layout: 'AppLayoutDefault' }
    }
]