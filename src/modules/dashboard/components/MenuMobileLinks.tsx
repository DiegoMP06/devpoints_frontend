import useDashboard from "@/hooks/useDashboard";
import LinkMobileMenu from "app/components/LinkMobileMenu";
import MenuMobile from "app/components/MenuMobile";
import { useParams } from "react-router";

export default function MenuMobileLinks() {
    const { isCreatorOfTheContest } = useDashboard();
    const params = useParams();
    const contestId = params.contestId || '';

    return (
        <MenuMobile>
            <LinkMobileMenu to={`/dashboard/contests/${contestId}`}>
                Detalles
            </LinkMobileMenu>
            
            {isCreatorOfTheContest && (
                <>
                    <LinkMobileMenu to={`/dashboard/contests/${contestId}/exercises`}>
                        Ejercicios
                    </LinkMobileMenu>
                    <LinkMobileMenu to={`/dashboard/contests/${contestId}/teams`}>
                        Equipos
                    </LinkMobileMenu>
                    <LinkMobileMenu to={`/dashboard/contests/${contestId}/evaluators`}>
                        Evaluadores
                    </LinkMobileMenu>
                </>
            )}

            <LinkMobileMenu to={`/dashboard/contests/${contestId}/assessment`}>
                Evaluar
            </LinkMobileMenu>
        </MenuMobile>
    )
}
