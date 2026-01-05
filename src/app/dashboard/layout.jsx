// app/dashboard/layout.jsx
import NavbarDashboard from "@/Componentes/NavbarDashboard";

export const metadata = {
    title: "Dashboard",
    description: "Panel de administración",
};

export default function DashboardLayout({ children }) {
    return (
        <section>
            <NavbarDashboard />
            <main>{children}</main>
        </section>
    );
}