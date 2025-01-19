import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    storeId: string;
};
const DashboardPage: React.FC<DashboardPageProps> = async (
    params
) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });
    
    return (
    <div>
        tienda: {store?.name}
       
    </div>);
};

export default DashboardPage;