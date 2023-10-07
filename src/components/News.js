import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [country, setCountry] = useState("in");
  const Country = [
    { CountryName: "India", Code: "in" },
    { CountryName: "Pakistan", Code: "pk" },
    { CountryName: "Sri Lanka", Code: "lk" },
    { CountryName: "Russia", Code: "ru" },
    { CountryName: "China", Code: "cn" },
    { CountryName: "United States", Code: "us" },
    { CountryName: "Brazil", Code: "br" },
    { CountryName: "Japan", Code: "jp" },
    { CountryName: "Australia", Code: "au" },
    { CountryName: "New Zealand", Code: "nz" },
    { CountryName: "Egypt", Code: "eg" },
    { CountryName: "Iran", Code: "ir" },
    { CountryName: "Turkey", Code: "tr" },
    { CountryName: "Israel", Code: "il" },
    { CountryName: "Saudi Arabia", Code: "sa" },
    { CountryName: "Mexico", Code: "mx" },
    { CountryName: "Peru", Code: "pe" },
    { CountryName: "Colombia", Code: "co" },
    { CountryName: "Argentina", Code: "ar" },
    { CountryName: "Chile", Code: "cl" },
    { CountryName: "Ecuador", Code: "ec" },
    { CountryName: "Venezuela", Code: "ve" },
    { CountryName: "Greece", Code: "gr" },
    { CountryName: "Spain", Code: "es" },
    { CountryName: "Portugal", Code: "pt" },
    { CountryName: "Sweden", Code: "se" },
  ];
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    console.log(country)
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    console.log(parsedData.articles)
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - GlobalNews`;
    updateNews();
  }, [country]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        GlobalNews - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <select
          onChange={(e)=>{setCountry(e.target.value);}}
          style={{
            padding: ".5rem",
            marginLeft: "10px",
            outline: "none",
            textAlign: "center",
          }}
        >
          <option>Select Country</option>
          {Country.map((item, index) => (
            <option value={item.Code} key={index}>
              {item.CountryName}
            </option>
          ))}
        </select>
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
