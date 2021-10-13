import React, { useState, useMemo, useCallback } from "react";
import { View, FlatList } from "react-native";

import Container from "../../../global/components/Container";
import HeaderBar from "../components/HeaderBar";
import ImageCard from "./ImageCard";

type Props = {
  backButtonColor?: string | undefined | null;
  backButtonComponent?: React.ReactNode;
  backButtonIconName?: any;
  doneButtonColor?: string | undefined | null;
  doneButtonIconName?: any;
  doneButtonComponent?: React.ReactNode;
  files?: Array<any>;
  onBackButtonPress?: () => void;
  onDoneButtonPress?: (data: any) => void;
  showBackButton?: boolean;
  showDoneButton?: boolean;
  doneButtonDisabled?: boolean | null;
  customHeaderComponent?: React.ReactNode;
};

type StateProp = {
  id: string;
  uri: string;
};

function ImageViewer({
  backButtonColor = null,
  backButtonComponent = null,
  backButtonIconName = "arrowleft",
  files = [],
  onBackButtonPress,
  showBackButton = true,
  onDoneButtonPress = (data: any) => {},
  doneButtonIconName = "check",
  showDoneButton = true,
  doneButtonComponent = null,
  doneButtonColor = null,
  doneButtonDisabled = null,
  customHeaderComponent = null,
}: Props) {
  // State variables
  const [Selected, SetSelected] = useState<Array<StateProp>>([]);

  // useCallbacks
  // Function to add selected items to state variable other wise remove them
  const onSelectPress = useCallback(
    (item: StateProp) => {
      if (Selected.includes(item))
        SetSelected(Selected.filter((i) => i !== item));
      else SetSelected([...Selected, item]);
    },
    [files, Selected]
  );

  // useMemos
  // useMemo for Image FlatList
  const ImageFlatList = useMemo(() => {
    return (
      <FlatList
        data={files}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ImageCard
            {...item}
            onPress={() => onSelectPress(item)}
            Selected={Selected.indexOf(item) !== -1}
          />
        )}
        numColumns={3}
      />
    );
  }, [files, Selected]);

  return (
    <Container style={{ flex: 1 }}>
      <HeaderBar
        onBackButtonPress={onBackButtonPress}
        backButtonIconName={backButtonIconName}
        showBackButton={showBackButton}
        backButtonComponent={backButtonComponent}
        backButtonColor={backButtonColor}
        onDoneButtonPress={() => onDoneButtonPress(Selected)}
        doneButtonIconName={doneButtonIconName}
        showDoneButton={showDoneButton}
        doneButtonComponent={doneButtonComponent}
        doneButtonColor={doneButtonColor}
        selectedLength={Selected.length}
        doneButtonDisabled={doneButtonDisabled}
        customHeaderComponent={customHeaderComponent}
      />
      <View style={{ flex: 1 }}>{ImageFlatList}</View>
    </Container>
  );
}

export default ImageViewer;
