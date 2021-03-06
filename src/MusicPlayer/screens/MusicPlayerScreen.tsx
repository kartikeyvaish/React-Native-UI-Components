import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import Slider from "@react-native-community/slider";

import AlbumArt from "./../components/AlbumArt";
import configs from "../config/configs";
import helper from "../utils/helper";

const defaultAlbumArt = configs.defaultAlbumArt;
const InitialTracks = configs.songsList;

function MusicPlayerScreen() {
  const [Tracks, SetTracks] = useState(InitialTracks);
  const [Progress, SetProgress] = useState(0);
  const [File, SetFile] = useState(InitialTracks[0]);
  const [Playing, SetPlaying] = useState(false);
  const [Loading, SetLoading] = useState(true);
  const [Duration, SetDuration] = useState(0);
  const sound = useRef(new Audio.Sound());
  const [modalVisible, setModalVisible] = useState(false);

  // useEffects
  // Load Audio and cleanup
  useEffect(() => {
    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  // Load Audio on file change
  useEffect(() => {
    LoadAudio();
  }, [File]);

  // Callbacks
  // Load Audio
  const LoadAudio = useCallback(async () => {
    SetLoading(true);
    try {
      const result = await sound.current.loadAsync(
        { uri: File.track },
        {
          shouldPlay: true,
        },
        true
      );
      if (result.isLoaded) {
        sound.current.setOnPlaybackStatusUpdate(PlayBackStatusUpdate);
        SetDuration(result?.durationMillis ? result.durationMillis : 0);
        SetLoading(false);
      } else {
        SetLoading(false);
        ToastAndroid.show("Error in Loading Audio", ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show("Error in Loading Audio", ToastAndroid.LONG);
      SetLoading(false);
    }
  }, [File]);

  // Toggle Play/Pause
  const ToggleAudioPlayback = useCallback(async () => {
    try {
      const result = await sound.current.getStatusAsync();

      if (result.isLoaded) {
        if (result.isPlaying === false) sound.current.playAsync();
        else sound.current.pauseAsync();
      } else LoadAudio();
    } catch (error) {}
  }, []);

  // Callbhack for Seek Update
  const SeekUpdate = useCallback(
    async (data: any) => {
      try {
        const checkLoading = await sound.current.getStatusAsync();

        if (checkLoading.isLoaded === true) {
          const result = (data / 100) * Duration;
          await sound.current.setPositionAsync(Math.round(result));
        }
      } catch (error) {}
    },
    [Duration]
  );

  // Callback for PlayBackStatusUpdate
  const PlayBackStatusUpdate = (playbackStatus: any) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        ToastAndroid.show(
          "Encountered a fatal error during playback",
          ToastAndroid.SHORT
        );
      }
    } else {
      if (playbackStatus.isPlaying) SetPlaying(true);
      else SetPlaying(false);

      if (playbackStatus.positionMillis)
        if (playbackStatus.durationMillis)
          SetProgress(
            (playbackStatus.positionMillis / playbackStatus.durationMillis) *
              100
          );

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping)
        GetNextTrack();
    }
  };

  // Callback for Next Track
  const GetNextTrack = useCallback(() => {
    const index = Tracks.findIndex((track: any) => track.id === File.id);
    if (index !== -1) {
      sound.current.unloadAsync();
      SetProgress(0);

      if (index === Tracks.length - 1) SetFile(Tracks[0]);
      else SetFile(Tracks[index + 1]);
    }
  }, [File, Tracks]);

  // Callback for Previous Track
  const GetPreviousTrack = useCallback(() => {
    const index = Tracks.findIndex((track: any) => track.id === File.id);
    if (index !== -1) {
      sound.current.unloadAsync();
      SetProgress(0);

      if (index === 0) SetFile(Tracks[Tracks.length - 1]);
      else SetFile(Tracks[index - 1]);
    }
  }, [File, Tracks]);

  // Callback for Selecting a File
  const SelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });
      if (result.type === "success") {
        // Add to Tracks List
        const newTracks = [...Tracks];
        const newTrackData = {
          id: Number.parseInt(helper.GenerateUniqueID()),
          title: result.name,
          artist: "",
          albumArt: defaultAlbumArt,
          track: result.uri,
        };

        newTracks.push(newTrackData);

        sound.current.unloadAsync();

        SetProgress(0);
        SetTracks(newTracks);
        SetFile(newTrackData);
      }
    } catch (error) {
      ToastAndroid.show("Error in Selecting File", ToastAndroid.LONG);
    }
  };

  // Callback to play a song with id
  const PlayWithID = async (id: number) => {
    try {
      const index = Tracks.findIndex((track: any) => track.id === id);
      if (index !== -1) {
        sound.current.unloadAsync();
        SetProgress(0);

        SetFile(Tracks[index]);
        setModalVisible(false);
      }
    } catch (error) {
      setModalVisible(false);
    }
  };

  // callback for Opening Modal
  const ToggleModal = () => setModalVisible(!modalVisible);

  // useMemos
  // useMemo for ALbum Art
  const GetAlbumArt = React.useMemo(
    () => <AlbumArt uri={File?.albumArt ? File.albumArt : defaultAlbumArt} />,
    [File]
  );

  // Callback for Track Title
  const GetTrackDetails = React.useMemo(
    () => (
      <View style={{ margin: 20, marginTop: 40 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {helper.RemoveExtension(File.title)}
        </Text>
        <Text style={{ color: "white" }}>{File.artist}</Text>
      </View>
    ),
    [File]
  );

  // useMemo for Slider
  const GetSlider = React.useMemo(
    () => (
      <View style={{ margin: 20 }}>
        <Text style={styles.TimeOne}>
          {helper.GetDurationFormat(Math.floor((Progress * Duration) / 100))}
        </Text>
        <Slider
          style={{ height: 40, width: "100%" }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="white"
          maximumTrackTintColor="grey"
          thumbTintColor="white"
          value={Progress}
          onSlidingComplete={(data) => SeekUpdate(data)}
        />
        <Text style={styles.TimeTwo}>
          {helper.GetDurationFormat(Duration || 0)}
        </Text>
      </View>
    ),
    [Duration, Progress]
  );

  // Callback for Play/Pause Button
  const GetPlayPauseButton = React.useMemo(
    () => (
      <View style={styles.Controllers}>
        <AntDesign
          name="stepbackward"
          color="white"
          size={30}
          onPress={GetPreviousTrack}
        />

        {Loading ? (
          <View style={styles.ActivityIndicator}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <AntDesign
            name={Playing ? "pausecircle" : "play"}
            color="white"
            size={60}
            onPress={ToggleAudioPlayback}
          />
        )}

        <AntDesign
          name="stepforward"
          color="white"
          size={30}
          onPress={GetNextTrack}
        />
      </View>
    ),
    [Playing, Loading, Progress]
  );

  // Render Modal
  const RenderModal = () => (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.ModalContainer}>
        <Text style={styles.ModalHeader}>
          List of Songs currently in the App. Click on a song to play it.
        </Text>
        <FlatList
          data={Tracks}
          renderItem={RenderPLaylistItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Modal>
  );

  // Render for Item in playlist
  const RenderPLaylistItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.ModalInnerContainer}
      onPress={() => PlayWithID(item.id)}
    >
      <Image source={{ uri: item.albumArt }} style={styles.PlaylistImage} />

      <View style={styles.PlaylistDetails}>
        <Text style={{ color: "white", fontSize: 20 }}>
          {helper.RemoveExtension(item.title)}
        </Text>
        <Text style={{ color: "white", fontSize: 15 }}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        animated={true}
        showHideTransition="slide"
        backgroundColor={"#212121"}
      />
      <View style={styles.container}>
        {GetAlbumArt}

        <View style={{ flex: 1 }}>
          {GetTrackDetails}

          {GetSlider}

          {GetPlayPauseButton}

          <View style={styles.BTNContainer}>
            <Entypo name="music" size={35} color="white" onPress={SelectFile} />
            <Entypo name="list" size={35} color="white" onPress={ToggleModal} />
          </View>
        </View>
      </View>

      {RenderModal()}
    </>
  );
}

export default MusicPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  TimeOne: {
    color: "grey",
    position: "absolute",
    left: 10,
    fontSize: 13,
    top: 30,
  },
  TimeTwo: {
    color: "grey",
    position: "absolute",
    right: 10,
    fontSize: 13,
    top: 30,
  },
  Controllers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ActivityIndicator: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  BTNContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  ModalContainer: {
    flex: 1,
    backgroundColor: "#212121",
  },
  ModalInnerContainer: {
    margin: 20,
    backgroundColor: "#212121",
    flexDirection: "row",
    padding: 10,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ModalHeader: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 0,
  },
  PlaylistImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  PlaylistDetails: { flex: 1, marginLeft: 20, justifyContent: "center" },
});
