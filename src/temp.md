const [searchParams, setSearchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("number") ?? "10");
  const [questions, setQuestions] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getquestions(limit),
    // enabled: sessionStorage.getItem("data") ? true : false,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false, // Do not refetch when the window is focused
    refetchOnReconnect: false, // Do not refetch when reconnecting to the internet
    refetchOnMount: false, // Do not refetch when the component remounts
    refetchInterval: false,
    
    onSuccess: (data) => {
      // Save data to state on the first successful fetch
      if (!questions) {
        setQuestions(data);
      }
    },
  });