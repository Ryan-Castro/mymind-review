import Link from "next/link"

export default function admin(){
    return(
        <div id="admin">
            <div id="navbarAdmin">
                <button>
                    <Link href="/">
                        <a>Pagina Inicial</a>
                    </Link>
                </button>
                <button>
                    <Link href="/creat">
                        <a>Criar Resumo</a>
                    </Link>
                </button>
            </div>
            
            <h1>FOI</h1>
        </div>
    )
}