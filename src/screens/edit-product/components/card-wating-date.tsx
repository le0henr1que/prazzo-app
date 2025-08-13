import { Image, StyleSheet, View } from "react-native";
import ScamBarIcon from "../../../../assets/icons/scam-bar";
import { colors } from "../../../styles/colors";
import { productInformation } from "../../../services/product";
import { Package } from "phosphor-react-native";
import Typography from "../../../components/text";
import { format, parse, parseISO } from "date-fns";
import { exportIconAndColor } from "../../../utils/export-Icon-and-color";
import { calculateDaysExpired } from "../../../utils/calculate-days-expired";
import { Ionicons } from "@expo/vector-icons";
import OnboardingBack from "../../../../assets/banner.png";
import { formatCurrency } from "../../../utils/format-to-money";
interface Batch {
  batchCode?: string;
  category?: string;
  category_id?: string;
  expires_at?: string; 
  id?: string;
  org?: any; 
  quantity?: number;
  section?: string;
  supplier?: string;
  unique_price?: number;
}
interface Product {
  name: string;
  code: string;
  batches: Batch[];
}

interface Props {
  product: Product;
}

export default function CardWatingDate({ product }: Props) {
  let expired_days;
  const expiresAt = product?.batches?.[0]?.expires_at;

  if (expiresAt) {
    const parsedDate = parseISO(expiresAt); 
    expired_days = format(parsedDate, "dd/MM/yyyy"); 
  }
  const daysExpired = calculateDaysExpired(expiresAt ?? ""); 
  const style = exportIconAndColor(daysExpired);
  return (
    <View style={styles.cardDate}>
      <View
        style={[
          styles.cardDataHeader,
          {
            backgroundColor: style?.color,
          },
        ]}
      >
        {!expired_days && (
          <Typography variant="XS" family="semibold">
            AGUARDANDO DATA
          </Typography>
        )}
        {expired_days && (
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Ionicons
              name={
                (exportIconAndColor(calculateDaysExpired(expiresAt ?? ""))
                  ?.icon as keyof typeof Ionicons.glyphMap) || ""
              }
              size={16}
              color={colors.white}
              style={{ marginLeft: 8 }}
            />
            <Typography
              variant="XS"
              family="semibold"
              style={{ color: colors.white }}
            >
              {style?.title}
            </Typography>
          </View>
        )}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 8,
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <View style={styles.cardDataContent}>
          <View>
            <Image
              source={ OnboardingBack /* uri: "https://via.placeholder.com/60" */ }
              style={styles.image}
            />
          </View>
          <View style={styles.productDetails}>
            <Typography
              variant="SM"
              family="semibold"
              style={styles.normalTitle}
            >
              {product.name}
            </Typography>
            
              <View style={styles.row}>
                <Typography
                  variant="XS"
                  family="medium"
                  style={styles.neutralTitle}
                >
                  Código do produto:{" "}
                </Typography>
                <Typography
                  variant="XS"
                  family="bold"
                  style={{
                    color: colors.neutral[7],
                  }}
                >
                  {product.code}
                </Typography> 
              </View>
              <View style={styles.row}>
                <Typography
                  variant="XS"
                  family="medium"
                  style={styles.neutralTitle}
                >
                  Data de validade:{" "}
                </Typography>
              <Typography
                  variant="XS"
                  family="bold"
                  style={{
                    color: colors.neutral[7],
                  }}
                >
                  {expired_days}
                </Typography>
              </View>
              <View style={styles.row}>
                <Typography
                  variant="XS"
                  family="medium"
                  style={styles.neutralTitle}
                >
                  Local:{" "}
                </Typography>
                 <Typography
                  variant="XS"
                  family="bold"
                  style={{
                    color: colors.neutral[7],
                  }}
                >
                  {product?.batches?.[0]?.section || "N/a"}
                </Typography> 
              </View>
            
          </View> 
            <Typography
              variant="BASE"
              family="semibold"
              style={{
                color: colors.brand.default,
              }}
            >
              R$ {formatCurrency(String(product.batches?.[0]?.unique_price))}
            </Typography>
        </View>
        <View style={styles.cardDataFooter}>
          <View style={styles.footerDiv}>
            <View style={styles.footerItem}>
              <Package size={16} color={colors.brand.default}/>
              <Typography variant="XS" family="bold" style={styles.cardDataTitleFooter}>
                {product.batches?.[0]?.batchCode}
              </Typography>
            </View>
            <View style={styles.footerItem}>
              <ScamBarIcon size={16} color={colors.brand.default} />
              <Typography variant="XS" family="bold" style={styles.cardDataTitleFooter}>
                {product.batches?.[0]?.quantity}
              </Typography>
            </View>
          </View>
          <View style={styles.categoryFooter}>
            <Typography variant="XS" family="semibold">
            {/*  {product.batches?.[0]?.category} */}Animal
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardDate: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[2]
  },
  image: { width: 80, height: 79, borderRadius: 4, marginRight: 0 },
  cardDataHeader: {
    display: "flex",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 6,
    alignSelf: "stretch",
    borderRadius: "8px 8px 0px 0px",
    backgroundColor: "#1F2937",
  },
  cardDataTitle: {
    color: "#FFF",
    textTransform: "uppercase",
  },
  normalTitle: {
    color: colors.neutral[7],
  },
  neutralTitle: {
    color: colors.neutral[5],
  },
  cardDataContent: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    gap: 8,
  },
  cardDataFooter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerDiv: {
    display: "flex",
    padding: 2,
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  cardDataTitleFooter: {
    color: colors.brand.default,
    textTransform: "uppercase",
  },
  footerItem:{
    flexDirection: "row",
    gap: 4,
  },
  categoryFooter:{
    borderRadius: 4,
    backgroundColor: colors.neutral[1],
    color: colors.neutral[7],
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
    flexShrink: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4, 
  },
});
