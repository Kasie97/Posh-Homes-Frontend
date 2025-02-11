import React from "react";
import styled from "styled-components";
import { numberWithCommas } from "../utils/utils";

interface UnitDescriptionProps {
	unit: {
		name: string;
		type: string;
		location: string;
		price: string;
		description: string;
	};
}

const UnitDescription: React.FC<UnitDescriptionProps> = ({ unit }) => {
	return (
		<div>
			<H2>{unit.name}</H2>
			<Para1>{unit.type}</Para1>
			<Para1>{unit.location}</Para1>
			<Para2>
				<span style={{ textDecorationLine: "line-through", textDecorationStyle: "double" }}>N</span>
				{numberWithCommas(+unit.price)}
			</Para2>
			<Para2>{unit.description}</Para2>
		</div>
	);
};

const H2 = styled.h2`
	font-family: Inter;
	font-size: 32px;
	font-weight: 600;
	line-height: 45px;
	letter-spacing: 0.25px;
	text-align: left;
	margin-top: 20px;
	color: #1d2939;
`;

const Para1 = styled.p`
	font-family: Inter;
	font-size: 16px;
	font-weight: 500;
	line-height: 22px;
	letter-spacing: 0.15000000596046448px;
	text-align: left;
`;

const Para2 = styled.p`
	font-size: 16px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0px;
	text-align: left;
	color: #757575;
	font-family: Heebo;
`;

export default UnitDescription;
