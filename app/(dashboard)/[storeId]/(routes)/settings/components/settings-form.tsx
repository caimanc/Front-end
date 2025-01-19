"use client";

import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";




interface SettingsFormProps { 
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1, { message: "Campo obligatorio" }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const origin = useOrigin();
    const router=useRouter();
    const [loading, setLoading] = useState(false);

    const form= useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });
    
    const onSubmit = async (data: SettingsFormValues) => {
        try{
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();

        }catch(error){
            console.log("[ALGO SALIO MAL]", error);
        }
        finally{
            setLoading(false);
        }
    }
    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);    
            router.refresh();
            router.push("/");
            console.log("Borrado con exito");
            
        }catch(error){
            console.log("[Revisar si borro los productos]", error);
        }
        finally{
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
            <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {onDelete()}}            
            loading={loading}   
            />

            <div className="flex items-center justify-between">
                <Heading
                title="Configuraciones"
                description="Administra las configuraciones de la tienda"/>
                <Button
                    disabled={loading}
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4"/> 
                </Button>    
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name" 
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Tienda" {...field}></Input>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" typeof="submit"> 
                        Guardar Cambios
                    </Button>

                </form>
            </Form>
            <Separator/>
            <ApiAlert 
                title="Api publica"
                description={`${origin}/api/${params.storeId}`}
                variant="public"/>
        </>
        
    )
}