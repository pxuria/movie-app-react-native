import { icons } from '@/constants/icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, KeyboardTypeOptions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    label: string;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
}

const InputField = ({ label, placeholder, keyboardType }: Props) => (
    <View className="w-[calc(50%-2px)] flex-1">
        <Text className="text-light-200">{label}</Text>
        <TextInput keyboardType={keyboardType} className='bg-dark-100 rounded-lg mt-2 text-white mb-2' placeholderTextColor='#A8B5DB' placeholder={placeholder} />
    </View>
)

const Profile = () => {
    const router = useRouter();

    return (
        <View className='bg-primary flex-1'>
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: '100%', paddingTop: 60 }}>
                <View className="flex flex-row flex-wrap gap-2 mb-4">
                    <InputField label='First Name' placeholder='Alex' />
                    <InputField label='Last Name' placeholder='Doe' />
                </View>

                <InputField keyboardType='email-address' label='Email' placeholder='Doe' />
            </ScrollView>

            <View className="absolute bottom-32 left-0 right-0 flex flex-row gap-2 z-50 mx-4">
                <TouchableOpacity
                    onPress={router.back}
                    className='bg-accent gap-4 rounded-lg py-3.5 w-1/2 flex flex-row items-center justify-center'>
                    <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff' />
                    <Text className='text-white font-semibold text-base'>Go Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={router.back}
                    className='bg-transparent border-accent border-2 gap-4 rounded-lg py-3.5 w-1/2 flex flex-row items-center justify-center'>
                    <Image source={icons.save} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#ab8bff' />
                    <Text className='text-accent font-semibold text-base'>Submit</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Profile;