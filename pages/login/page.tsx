import { Section } from '@radix-ui/themes';
import {
    LoginButton,
    LogoutButton,
} from "../../components/elements/Button/Button";

export default function Page() {
    return (
      <Section>
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}
        >
            <div>
                <LoginButton/>
                <LogoutButton/>
            </div>
        </main>
      </Section>
    )
}