import styled from "styled-components";

const Component = styled.div`
    width: 100%;
    font-size: 12px;
    text-align: right;
    color: rgba(255, 255, 255, 0.75);
`;

interface AlertErrorFormProps{
    children: React.ReactNode
}

export default function AlertErrorForm({ children }: AlertErrorFormProps){
	return(
		<Component>
			{children}
		</Component>
	);
}