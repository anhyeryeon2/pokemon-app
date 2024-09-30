import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from '../../components/PokeCard'
import AutoComplete from '../../components/AutoComplete';

function MainPage() {
  //모든 포켓몬 데이터를 가지고 있는 State
  const [allpokemons, setAllpokemons] = useState([]);
  // 실제로 리스트로 보여주는 포켓몬 데이터를 가지고있는 State
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  //한번에 보여주는 포켓몬 수
  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  // const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() =>{
    fetchPokeData();
  },[])

  // useEffect(() =>{
  //   handleSearchInput(debouncedSearchTerm)
  // },[debouncedSearchTerm])

  const filterDisplayedPokemonData = (allpokemonsData, displayedPokemons=[])=>{
    const limit = displayedPokemons.length+limitNum;
    //모든 포켓몬 데이터에서 limitNum만큼 더 가져오기
    const array = allpokemonsData.filter((_,index)=> index+1<=limit);
    return array;
  }

   // 포켓몬 데이터를 가져오는 함수 (처음 fetch인지 여부를 받아서 처리)
  const fetchPokeData = async() =>{
    try{
    // 1008 포켓몬 데이터 받아오기
    const response = await axios.get(url);
    //모든 포켓몬 데이터 기억하기
    setAllpokemons(response.data.results);
    setDisplayedPokemons(filterDisplayedPokemonData(response.data.results))
    }catch(error){
      console.error(error)
    }
  }

  // const handleSearchInput = async (searchTerm) =>{
    
  //   if(searchTerm.length >0 ){
  //     try{
  //       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
  //       const pokemonData = {
  //         url: ` https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
  //         name:searchTerm
  //       }
  //       setDisplayedPokemons([pokemonData])
  //     }catch(error){
  //       setDisplayedPokemons([]) ;
  //       console.error(error);
  //     }
  //   }else{
  //     fetchPokeData();
  //   }
  // }

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
       <AutoComplete
        allpokemons={allpokemons}
        setDisplayedPokemons = {setDisplayedPokemons}
       />
      </header>
      <section className="pt-6 flex flex-col justify-content items-center">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }, index) => (
              <div>
                <PokeCard key={url} url={url} name={name} />
              </div>
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        {allpokemons.length > displayedPokemons.length && displayedPokemons.length !== 1 && (
          <button
            onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allpokemons, displayedPokemons))}
            className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
          >
            더 보기
          </button>
        )}
      </div>
    </article>
  );
}

export default MainPage
