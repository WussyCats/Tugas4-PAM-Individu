import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { Card } from "../components"
import { COLORS, SIZES, FONTS, SHADOW } from "../constants"

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.padding
    },
    textBoxWrapper: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: SIZES.padding
    },
    textInput: {
        ...SHADOW,
        borderRadius: SIZES.textBoxRadius,
        backgroundColor: COLORS.secondary,
        height: 42,
        paddingLeft: 15,
        width: "90%",
        color: COLORS.primary,
        marginRight: 15,
        ...FONTS.h2_semiBold,
    },
    btn: {
        ...SHADOW,
        backgroundColor: COLORS.accent,
        height: 50,
        width: 50,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default function Homepage() {

    // State variables
    const [list, setList] = useState([])
    const [value, setValue] = useState("")

    // Sebuah fungsi yang menambahkan data ke daftar array
    function addText(text) {
        if (value !== "") {
            setList(prev => {
                return [
                    ...prev,
                    { text: text, isSelected: false } // Menambahkan Objek JS
                ]
            })
            setValue("")
        } else {
            alert("Please type in something!")
        }
    }

    // Fungsi yang mengatur nilai Selected berdasarkan status kotak centang
    function setIsSelected(index, value) {
        let data = []

        // Membuat salinan dalam dari array daftar
        for (let i = 0; i < list.length; i++) {
            if (index === i) {
                data.push({ ...list[i], isSelected: value }) // Memperbarui objek pada posisi i === indeks
            } else {
                data.push(list[i])
            }
        }

        setList(data) // Setting the new state
    }

    // Fungsi yang menghapus item pada indeks posisi dari daftar array
    function deleteItem(idx) {
        Alert.alert(
            "Hapus Agenda",
            "Apakah kamu ingin menghapus agenda ini?",
            [
                {
                    text: "Tidak",
                    style: "cancel"
                },
                {
                    text: "Iya", onPress: () => {
                        const data = list.filter((item, index) => index !== idx)
                        setList(data)
                    }
                }
            ])
    }


    return <View style={styles.container}>
        <Text style={{ ...FONTS.h1_semiBold, color: COLORS.secondary, marginBottom: 15 }}>Agenda pada hari ini.</Text>
        <FlatList style={{ flex: 1 }}
            data={list}
            renderItem={({ item, index }) => <Card data={item} index={index} setIsSelected={setIsSelected} deleteItem={deleteItem} />}
            keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.textBoxWrapper}>
            <TextInput
                style={styles.textInput}
                placeholder="Tambahkan agenda..."
                placeholderTextColor={COLORS.primary}
                onChangeText={text => setValue(text)}
                value={value} />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => addText(value)}>
                <Text style={{ fontSize: 30, color: COLORS.secondary }}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
}