import Orders from "../views/OrdersView.vue";
import Profile from "../views/ProfileView.vue";

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
        path: '/cart',
        name: 'CartView',
        component: () => import("../views/CartView.vue"),
        meta: { layout: 'AppLayoutMain' }

    },

    {

        path: '/user',
        name: 'UserView',
        component: () => import("../views/UserView.vue"),
        redirect: "/user/profile",
        meta: { layout: 'AppLayoutMain' },

        children: [
            {
                path: 'orders',
                // name: 'OrdersView',
                component: Orders,
                meta: { layout: 'AppLayoutMain' }

            },
            {
                path: 'profile',
                // name: 'ProfileView',
                component: Profile,
                meta: { layout: 'AppLayoutMain' }

                // meta: { layout: 'AppLayoutDefault' }
            }

        ]

    }
]