import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
};

const textMap: Record<ApiAlertProps["variant"], string> = {
    public:"Publico",
    admin: "Admin" 
}
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public:"secondary",
    admin: "destructive" 
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,  
    description,
    variant="public"    
}) => {
    const onCopy = () => {
        navigator.clipboard.writeText(description);
        
    }
    return ( 
        <Alert>
            <Server className="h-4 w-4"/>
            <AlertTitle className="flex items-center gap-x-3">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
                </AlertTitle>
                <AlertDescription className="mt-4 flex items-center justify-between">
                    <code className="relative rounded bg-yellow-400 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {description}
                    </code>
                    <Button variant={"outline"} size={"icon"} onClick={onCopy}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </AlertDescription>
        </Alert>
    )
                         
}