interface ILink {
    to: string,
    name: string
}

export const dealer_links: ILink[] = [
    {
        to: "/contracts",
        name: "Договора"
    },
    {
        to: "/providers",
        name: "Поставщики"
    },
    {
        to: "/clients",
        name: "Клиенты"
    },
    {
        to: "/products",
        name: "Товары"
    },
    {
        to: "/bills",
        name: "Счета"
    }
];

export const admin_links: ILink[] = [
    {
        to: "/users",
        name: "Пользователи"
    }
];