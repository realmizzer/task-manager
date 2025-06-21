import {observer} from "mobx-react";
import {useStores} from "@/shared/stores/lib/useStores.ts";
import {Button, SafeAreaView, Text, View} from "react-native";

export const HomeScreen = observer(() => {
  const {counter} = useStores();

  return (
    <SafeAreaView>
      <Text>{counter.counter}</Text>
      <Button title={'increment'} onPress={counter.increment} />
    </SafeAreaView>
  );
})
