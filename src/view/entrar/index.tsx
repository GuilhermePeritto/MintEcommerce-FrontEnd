import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Api from "@/infra/helpers/api"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"

export default function Entrar() {
    const [email, setEmail] = useState(""),
        [senha, setSenha] = useState(""),
        { toast } = useToast();

    const logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {
            email,
            senha
        }

        try {
            const { data } = await Api.post("usuario/entrar", dto);
            if (data) {
                toast({
                    variant: "success",
                    description: "Login realizado com sucesso!",
                })
            }

        } catch (error: any) {
            if (error.response) {
                toast({
                    variant: "destructive",
                    title: "Erro!",
                    description: error.response.data,
                    action: <ToastAction altText="Tentar Novamente" onClick={() => logar(e)}>Tentar novamente</ToastAction>,
                })

            } else {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: "Erro ao realizar login!",
                    action: <ToastAction altText="Tentar Novamente">Tentar novamente</ToastAction>,
                })
            }
        }
    }


    return (
        <form onSubmit={logar}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Entrar</CardTitle>
                    <CardDescription>
                        Insira seu e-mail abaixo para fazer login na sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="jose.silva@mintecommerce.com.br"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                                <Link to="/recuperarsenha" className="ml-auto inline-block text-sm underline">
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                            <Input id="password" type="password" placeholder="senha" required onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                        <Button variant="outline" className="w-full">
                            Entrar com o Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Não tem uma conta?{" "}
                        <Link to="/criarconta" className="underline">
                            Cadastre-se
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}