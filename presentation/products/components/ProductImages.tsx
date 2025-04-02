import { FlashList } from "@shopify/flash-list";
import { Image, View } from "react-native";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  return (
    <>
      {images.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("@/assets/images/no-product-image.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : (
        <FlashList
          data={images}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={300}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: 300,
                height: 300,
                marginHorizontal: 7,
                borderRadius: 5,
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default ProductImages;
