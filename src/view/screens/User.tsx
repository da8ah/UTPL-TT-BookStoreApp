import { useNavigation } from "@react-navigation/native";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import useClient from "../../hooks/useClient";
import RoundButton from "../components/RoundButton";
import { UserNavProps } from "../routes/types.nav";
import Client from "../../model/core/entities/Client";

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
    const navigation = useNavigation<UserNavProps>()
    const { logout } = useAuth()
    const { client, updateClient, postSignIn } = useClient()

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

    const PersonIcon = () => <Icon name="person-outline" fill="#C6C6C6" height="50" width="50" />
    const CardIcon = () => <Icon name="credit-card" fill="white" height="50" width="50" />
    const BagIcon = () => <Icon name="shopping-bag" fill="white" height="50" width="50" />
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
                    accessoryLeft={CardIcon}
                    style={{ borderRadius: 100 }}
                />
                <RoundButton
                    size="small"
                    backgroundColor="black"
                    icon={PersonIcon}
                    onPress={() => navigation.navigate("UserEditor")}
                />
                <Button
                    size="tiny"
                    status="success"
                    accessoryLeft={BagIcon}
                    style={{ borderRadius: 100 }}
                    onPress={() => {
                        postSignIn()
                        navigation.navigate("UserTransactions")
                    }}
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
