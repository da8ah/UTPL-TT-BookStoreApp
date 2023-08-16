import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

export default function CartStatus(props: { fecha: string, subtotal: number, ivaCalc: number, discountCalc: number, total: number }) {
    const { fecha, subtotal, ivaCalc, discountCalc, total } = props
    return <View style={[styles.cartStatus, { backgroundColor: 'white' }]}>
        <View style={[styles.statusLayouts, { width: "20%" }]}>
            <Text style={{ color: 'black', fontWeight: "bold" }}>Fecha</Text>
            <Text style={[styles.statusProperties, { fontWeight: "normal" }]}>{fecha}</Text>
        </View>
        <View style={[styles.statusLayouts]}>
            <Text style={[styles.statusProperties]}>Subtotal</Text>
            <Text style={[styles.statusProperties, { fontSize: 13 }]}>{subtotal.toFixed(2)}</Text>
        </View>
        <View style={[styles.statusLayouts]}>
            <Text style={[styles.statusProperties]}>IVA</Text>
            <Text style={[styles.statusProperties, { color: "darkred" }]}>+{ivaCalc.toFixed(2)}</Text>
        </View>
        <View style={[styles.statusLayouts]}>
            <Text style={[styles.statusProperties]}>Descuento</Text>
            <Text style={[styles.statusProperties, { color: "darkgreen" }]}>-{discountCalc.toFixed(2)}</Text>
        </View>
        <View style={[styles.statusLayouts, { backgroundColor: "orange", width: "25%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]}>
            <Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>TOTAL</Text>
            <Text style={[styles.statusProperties, { width: "100%", fontSize: 18 }]}>$ {total.toFixed(2)}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    cartStatus: { paddingVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    statusLayouts: { backgroundColor: "transparent", alignItems: "center", paddingVertical: 5 },
    statusProperties: { color: 'black', textAlign: "center", fontSize: 12, fontWeight: "bold" },
});