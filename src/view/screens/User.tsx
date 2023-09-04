import { useNavigation } from "@react-navigation/native";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { usePreventScreenCapture } from "expo-screen-capture";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useClient from "../../hooks/useClient";
import { useFormStore } from "../../hooks/useForm";
import Client from "../../model/core/entities/Client";
import { UserNavProps } from "../routes/types.nav";

const styles = StyleSheet.create({
    common: {
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
    },
    buttonLayout: { backgroundColor: "transparent", flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
    cardPropsRow: { backgroundColor: "transparent", flexDirection: "row", alignItems: "center", marginHorizontal: -15 },
    cardKeys: {
        width: "35%",
        fontSize: 10,
        textTransform: "uppercase",
    },
    cardValues: {
        width: "65%",
        height: 20,
        fontSize: 15,
    },
});

export default function ProfileScreen() {
    usePreventScreenCapture('user') // Screenshots NOT Allowed

    const navigation = useNavigation<UserNavProps>()
    const { logout } = useAuth()
    const { client, updateClient } = useClient()
    const { resetClient } = useFormStore()

    useEffect(() => { resetClient() }, [])

    const cuenta = {
        usuario: client.getUser(),
        nombre: client.getName(),
        email: client.getEmail(),
        móvil: client.getMobile(),
        clave: "********"
    }
    const cuentaChildren: JSX.Element[] = Object.entries(cuenta).map(([key, value], index) => (
        <View key={`clientProp${index}`} style={styles.cardPropsRow}>
            <Text style={styles.cardKeys}>{key}</Text>
            <Text style={styles.cardValues} numberOfLines={1} ellipsizeMode="middle">
                {value}
            </Text>
        </View>
    ))

    const facturacion = {
        Destinatario: client.getBillingInfo()?.getToWhom(),
        CI: client.getBillingInfo()?.getCi(),
        Provincia: client.getBillingInfo()?.getProvincia(),
        Ciudad: client.getBillingInfo()?.getCiudad(),
        "Número de casa": client.getBillingInfo()?.getNumCasa(),
        Calles: client.getBillingInfo()?.getCalles()
    }
    const facturacionChildren: JSX.Element[] = Object.entries(facturacion).map(([key, value], index) => (
        <View key={`billingInfoProp${index}`} style={styles.cardPropsRow}>
            <Text style={styles.cardKeys}>{key}</Text>
            <Text style={styles.cardValues} numberOfLines={1} ellipsizeMode="middle">
                {value}
            </Text>
        </View>
    ))

    const EditIcon = () => <Icon name="edit-2" fill="white" height="40" width="40" />
    const BagIcon = () => <Icon name="shopping-bag" fill="white" height="40" width="40" />
    const CardHeader = (props: { title: string }) => (
        <Text style={{ backgroundColor: "black", color: "white", padding: 2, paddingLeft: 20 }}>{props.title}</Text>
    )
    const ButtonIcon = () => <Icon name="log-out" fill="white" height="20" width="20" rotation={180} />;

    return (
        <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", paddingTop: 10 }}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}>
                    {cuenta.usuario}
                </Text>
            </View>
            <View style={[styles.common, styles.buttonLayout]}>
                <Button
                    size="tiny"
                    status="warning"
                    accessoryLeft={EditIcon}
                    style={{ borderRadius: 100 }}
                    onPress={() => navigation.navigate("UserEditor")}
                />
                <Button
                    size="tiny"
                    status="success"
                    accessoryLeft={BagIcon}
                    style={{ borderRadius: 100 }}
                    onPress={() => navigation.navigate("UserTransactions")}
                />
            </View>
            <Card key="client" header={<CardHeader title="Cuenta" />} style={{ width: "80%", borderRadius: 20 }}>
                {cuentaChildren}
            </Card>
            <Card key="billingInfo" header={<CardHeader title="Facturación" />} style={{ width: "80%", borderRadius: 20 }}>
                {facturacionChildren}
            </Card>
            <View style={[styles.common, { alignItems: "center" }]}>
                <Button
                    style={{ width: "70%" }}
                    size="medium"
                    status="danger"
                    accessoryRight={ButtonIcon}
                    onPress={() => {
                        logout()
                        updateClient(new Client('', '', '', '', ''))
                    }}
                >
                    Cerrar Sesión
                </Button>
            </View>
        </View>
    )
}
