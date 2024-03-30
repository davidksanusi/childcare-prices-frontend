"use client";
import { Button, Empty, Select, Skeleton } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  letterOptions,
  numOfLettersOptions,
  genderOptions,
  birthYearsOptions,
  sortByOptions,
} from "./selectOptions";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterComponent } from "../filters";
import BarChart from "./chart";

const Main = () => {
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [childcareData, setChildcareData] = useState(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  console.log("slug_input", state);
  const slug = searchParams?.get("slug");
  const fetchChildcareData = async (
    slug = null,
    defaultCity = "Los Angeles",
    defaultState = "CA",
    defaultAge = 3
  ) => {
    try {
      setLoading(true);

      let requestBody = {};

      // Add slug_input to request body if it's present in the URL
      if (slug) {
        requestBody.slug = slug;
      } else {
        // Prepare the request body with filters
        requestBody = {
          city: city ? city : defaultCity,
          state: state ? state : defaultState,
          age: age ? age : defaultAge,
        };
      }

      // Remove null or undefined values from the request body
      requestBody = Object.fromEntries(
        Object.entries(requestBody).filter(([_, value]) => value != null)
      );

      const response = await fetch(
        "https://childcare-prices.onrender.com/api/filter_names",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setChildcareData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchChildcareData();
  }, [age, city]);

  // Function to handle filter change
  const handleSelectValue = (filter, value) => {
    console.log("value");
    switch (filter) {
      case "age":
        setAge(value);
        break;
      case "city":
        setCity(value);
        break;
      default:
        break;
    }
  };

  // Function to clear all filters
  const clearFilter = () => {
    setCity("");
    setState("");
    setAge("");
  };
  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": [2488, 1000], // Add two values for each category
    },
    {
      name: "Birds",
      "Number of threatened species": [1445, 800],
    },
    {
      name: "Crustaceans",
      "Number of threatened species": [743, 400],
    },
    {
      name: "Ferns",
      "Number of threatened species": [281, 150],
    },
    {
      name: "Arachnids",
      "Number of threatened species": [251, 120],
    },
    {
      name: "Corals",
      "Number of threatened species": [232, 100],
    },
    {
      name: "Algae",
      "Number of threatened species": [98, 50],
    },
  ];
  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();
  return (
    <>
      <div className="flex flex-col gap-12 justify-start overflow-hidden items-start py-6 px-4 bg-white">
        <div className="flex flex-col justify-start items-start gap-6  w-[80%] mx-auto">
          {/* Heading */}
          {loading ? (
            <>
              {" "}
              <span className="h-[40px] w-full px-4 md:px-6 lg:px-16 xl:px-6">
                <Skeleton
                  active
                  title={{ width: "25%" }}
                  paragraph={{ rows: 1 }}
                />
              </span>
            </>
          ) : (
            <p className="text-[#0D121C] text-3xl font-bold leading-normal ">
              {childcareData?.data?.title?.seo_title}{" "}
            </p>
          )}

          {/* Select fields */}
          <FilterComponent
            handleSelectValue={handleSelectValue}
            setState={(e) => setState(e)}
            city={city}
            age={age}
            clearFilter={clearFilter}
          />
        </div>
        <div className="w-[80%] mx-auto">
          {!loading ? (
            childcareData?.data?.content?.slice(0, -1)?.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "40px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <h2 className="text-2xl font-bold leading-normal text-[#0D121C]">
                  {item.title}
                </h2>
                <p>{item.body}</p>

                <div className="flex flex-col gap-3 py-3 justify-start items-start w-full">
                  <BarChart data={item.chart_data} />
                </div>
              </div>
            ))
          ) : (
            <div>
              <Skeleton active paragraph={{ rows: 5 }} />
            </div>
          )}
        </div>
        {!loading ? (
          <div
            className="w-[80%] mx-auto"
            style={{
              marginBottom: "40px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
          
            <div className="flex flex-wrap w-full">
            <h2 className="text-2xl font-bold leading-normal text-[#0D121C] mb-3">
                  {childcareData?.data?.content?.find(
                (item) => item.chart_type === "quick_facts"
              ).title}
                </h2>
                <p className="mb-3">{childcareData?.data?.content?.find(
                (item) => item.chart_type === "quick_facts"
              ).body}</p>
              {childcareData?.data?.content?.find(
                (item) => item.chart_type === "quick_facts"
              ) ? (
                <div
                  key={childcareData?.data?.content
                    ?.slice(0, -1)
                    .reverse()
                    .findIndex((item) => item.chart_type === "quick_facts")}
                  className="flex flex-row justify-between items-center w-full"
                >
                  <div className="flex flex-row flex-wrap gap-2 justify-start items-start py-4 border-t border-[#E5E8EB] w-full">
                    {childcareData?.data?.content
                      ?.find((item) => item.chart_type === "quick_facts")
                      .chart_data.map((fact, index) => (
                        <div key={index} className="w-[49%]">
                          <p className="text-[#4A699C] text-sm leading-normal">
                            {fact.name}
                          </p>
                          <p className="text-[#0D121C] text-sm leading-normal">
                            {fact.body}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <Empty description="Facts not found" />
              )}
            </div>
          </div>
        ) : (
          <div>
            <Skeleton active paragraph={{ rows: 3 }} />
          </div>
        )}

        <div className="px-2 md:px-2 lg:px-2 xl:px-2 mx-auto w-[80%] h-full">
          {loading || loading == null ? (
            <Skeleton active paragraph={{ rows: 5 }} />
          ) : (
            <div className="flex flex-col gap-3 py-3 my-3 justify-start items-start w-full">
              <p className="text-2xl font-bold leading-normal text-[#0D121C]">
                {childcareData?.data?.faq?.faq_title}
              </p>
              <div className="flex flex-col justify-start items-start w-full bg-white rounded-xl">
                {childcareData?.data?.faq?.faq_body?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center py-4  w-full"
                  >
                    <Image
                      alt=""
                      src={"/question.png"}
                      height={48}
                      width={48}
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-[#121417] text-base font-medium leading-normal">
                        {item.question}
                      </p>

                      <p className="text-[#61788A] text-sm font-normal leading-normal">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 py-3 justify-start items-start  w-[80%] mx-auto">
          <p className="text-2xl font-bold leading-normal text-[#0D121C]">
            Explore Categories
          </p>

          {loading == null || loading ? (
            // Display four loading cards
            <div className="flex gap-2 justify-start items-center flex-wrap">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex  flex-row justify-between items-center "
                >
                  <div className="min-w-[200px] rounded-2xl bg-[#E8EDF5] font-medium text-[#0D121C] text-sm leading-normal p-4 text-start">
                    {" "}
                    <Skeleton
                      title={{ width: "100%" }}
                      active
                      paragraph={{ rows: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-2 justify-start items-center flex-wrap ">
              {childcareData?.data?.random_costs?.map((item, index) => (
                <p
                  key={index}
                  onClick={() =>
                    router.push(`/?slug=${item?.slug?.replaceAll("/", "")}`)
                  }
                  className="min-w-fit rounded-2xl bg-[#E8EDF5] cursor-pointer font-medium text-[#0D121C] text-sm leading-normal p-2 px-4 text-start"
                >
                  {item?.seo_title}
                </p>
              ))}
            </div>
          )}
        </div>
        <></>
      </div>
    </>
  );
};

export default Main;
