import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface IProps {
	value: number;
	min?: number;
	max?: number;
	color?: string;
	numColor?: string;
	numBgColor?: string;
	showBorder?: boolean;
	fontSize?: number;
	btnFontSize?: number;
	buttonTextColor?: string;
	width?: number;
	height?: number;
	disabled?: boolean;
	onNumChange?(num: number): void;
}

const default_props = {
	disabled: false,
	max: Infinity,
	min: -Infinity
};

export default function Spinner(p: IProps) {
	const props = {
		...default_props,
		...p
	};

	const [value, setvalue] = useState(props.value);
	function increase() {
		if (props.disabled) {
			return;
		}
		if (props.max && props.max <= value) {
			return;
		}
		const v = value + 1;
		if (props.onNumChange) {
			props.onNumChange(v);
		}
		setvalue(v);
	}
	function decrease() {
		if (props.disabled) {
			return;
		}
		if (props.min && props.min >= value) {
			return;
		}
		const v = value - 1;
		if (props.onNumChange) {
			props.onNumChange(v);
		}
		setvalue(v);
	}
	return (
		<View style={[
			styles.container,
			{ borderColor: props.showBorder ? props.color : 'transparent' },
			{ width: props.width }
		]}>
			<TouchableOpacity
				style={[
					styles.btn,
					{ backgroundColor: props.color },
					{ borderColor: props.showBorder ? props.color : 'transparent' },
					{ height: props.height }
				]}
				onPress={decrease}>
				<Text style={[
					styles.btnText,
					{ color: props.buttonTextColor, fontSize: props.btnFontSize }
				]}>-</Text>
			</TouchableOpacity>
			<View style={[
				styles.num,
				{
					backgroundColor: props.numBgColor, borderColor: props.showBorder ? props.color : 'transparent', height: props.height
				}
			]}>
				<Text style={[styles.numText, { color: props.numColor, fontSize: props.fontSize }]}>{value}</Text>
			</View>
			<TouchableOpacity
				style={[
					styles.btn,
					{ backgroundColor: props.color },
					{ borderColor: props.showBorder ? props.color : 'transparent' },
					{ height: props.height }
				]}
				onPress={increase}>
				<Text style={[
					styles.btnText,
					{
						color: props.buttonTextColor, fontSize: props.btnFontSize
					}
				]}>+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		borderWidth: 0.5,
		flexDirection: 'row',
		overflow: 'hidden',
		width: 200
	},

	btn: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},

	btnText: {
		color: 'white',
		textAlign: 'center'
	},

	num: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},

	numText: {
		textAlign: 'center'
	}
});
