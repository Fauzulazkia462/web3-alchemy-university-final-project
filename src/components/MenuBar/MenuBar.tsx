import {
    Menubar as MenuBarShad,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

interface MenuCategory {
    label: string;
    onClick: () => void;
}

interface MenuBarProps {
    menus: MenuCategory[];
}

export const MenuBar: React.FC<MenuBarProps> = ({ menus }) => {
    return (
        <MenuBarShad>
            {menus.map((menu, index) => (
                <MenubarMenu key={index}>
                    <MenubarTrigger onClick={menu.onClick}>{menu.label}</MenubarTrigger>
                </MenubarMenu>
            ))}
        </MenuBarShad>
    );
};