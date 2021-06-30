import { FC } from "react"
import { Container } from "./styles"

export const CodeCellContainer: FC = ({children}) => {

    return (
        <Container>
            {children}
        </Container>
    )
}