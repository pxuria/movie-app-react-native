import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/use-fetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const { data: trendMovies, loading: trendLoading, error: trendError } = useFetch(getTrendingMovies);
  const { data: movies, loading, error } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading || trendLoading ? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            className="mt-10 self-center" />
        ) : (
          error || trendError ? (
            <Text>Error:{error?.message || trendError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <Searchbar
                onPress={() => router.push('/search')}
                placeholder="Search for a movie..." />
              {trendMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>

                  <FlatList
                    horizontal
                    data={trendMovies}
                    className="mb-4 mt-3"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.movie_id.toString()}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}

                  // numColumns={3}
                  // scrollEnabled={false}
                  // columnWrapperStyle={{
                  //   justifyContent: 'flex-start',
                  //   gap: 20,
                  //   paddingRight: 5,
                  //   marginBottom: 10
                  // }}
                  />
                </View>
              )}
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                <FlatList
                  data={movies}
                  numColumns={3}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10
                  }}
                  className="mt-2 pb-32"
                  renderItem={({ item }) => <MovieCard {...item} />}
                />
              </>
            </View>
          )
        )}

        <View className="flex-1 mt-5">
          <Searchbar
            onPress={() => router.push('/search')}
            placeholder="Search for a movie..." />
        </View>
      </ScrollView>
    </View>
  );
}
