import { Product } from "@/core/products/interfaces/products";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: "#F9F9F9",
        margin: 3,
        borderRadius: 5,
        overflow: "hidden",
        height: 260,
        padding: 5,
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => router.push(`/product/${product.id}`)}
      >
        {product.images.length === 0 ? (
          <Image
            source={require("../../../assets/images/no-product-image.png")}
            style={{ width: "100%", height: 200 }}
          />
        ) : (
          <Image
            source={{ uri: product.images[0] }}
            style={{ width: "100%", height: 200 }}
          />
        )}

        <ThemedText
          numberOfLines={2}
          style={{ textAlign: "center" }}
          darkColor={"black"}
        >
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default ProductCard;
