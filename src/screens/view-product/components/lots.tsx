import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../../styles/colors";
import BatchCard from "../../../components/batch-card";
/* 
export const batchList = [
  {
    price: 20.0,
    batchCode: "1234567890",
    expiryDate: "12/12/2023",
    quantity: 5,
    expiredDays: 2,
  },
  {
    price: 20.0,
    batchCode: "1234567890",
    expiryDate: "12/12/2023",
    quantity: 5,
    expiredDays: 2,
  },
  {
    price: 20.0,
    batchCode: "1234567890",
    expiryDate: "12/12/2023",
    quantity: 5,
    expiredDays: 2,
  },
  {
    price: 20.0,
    batchCode: "1234567890",
    expiryDate: "12/12/2023",
    quantity: 5,
    expiredDays: 2,
  },
  {
    price: 20.0,
    batchCode: "1234567890",
    expiryDate: "12/12/2023",
    quantity: 5,
    expiredDays: 2,
  },
  {
    price: 20.0,
    batchCode: "1234567890",
    expiryDate: "12/12/2023",
    quantity: 5,
    expiredDays: 2,
  },
  {
    price: 20.0,
    batchCode: "1234567890",
    expiryDate: "12/12/2023",
    quantity: 5,
    expiredDays: 2,
  },
]; */

interface Batch {
  batchCode: string;
  unique_price: number;
  quantity: number;
  expires_at: number;
}

interface Props {
  data: Batch[];
}

function Lots({ data }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {data.map((batch, index) => (
          <View key={index} style={{ marginBottom: 16, width: "100%" }}>
            <BatchCard batch={batch} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    paddingHorizontal: 16,
    gap: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
  },
  header: {
    backgroundColor: "#f44",
    padding: 10,
    display: "flex",
    gap: 6,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  expiredText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  body: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    width: "85%",
  },
  price: {
    color: "#007f00",
    fontWeight: "bold",
    marginVertical: 5,
    width: "15%",
  },
  text: {
    fontSize: 14,
    color: colors.neutral["600"],
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  quantity: {
    fontWeight: "bold",
    color: "#0D9488",
  },
  category: {
    fontSize: 14,
    backgroundColor: colors.neutral["100"],
    paddingVertical: 2,
    paddingHorizontal: 12,
    color: colors.neutral["900"],
    borderRadius: 4,
  },
});
export default Lots;
