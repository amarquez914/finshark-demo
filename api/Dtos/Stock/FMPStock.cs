using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace api.Dtos.Stock
{
    public class FMPStock
    {
        [JsonProperty("symbol")]
        public string Symbol { get; set; }

        [JsonProperty("price")]
        public double Price { get; set; }

        [JsonProperty("marketCap")]
        public long MarketCap { get; set; }

        [JsonProperty("beta")]
        public double Beta { get; set; }

        [JsonProperty("lastDividend")]
        public double LastDividend { get; set; }

        [JsonProperty("range")]
        public string Range { get; set; }

        [JsonProperty("change")]
        public double Change { get; set; }

        [JsonProperty("changePercentage")]
        public double ChangePercentage { get; set; }

        [JsonProperty("volume")]
        public int Volume { get; set; }

        [JsonProperty("averageVolume")]
        public int AverageVolume { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("cik")]
        public string Cik { get; set; }

        [JsonProperty("isin")]
        public string Isin { get; set; }

        [JsonProperty("cusip")]
        public string Cusip { get; set; }

        [JsonProperty("exchangeFullName")]
        public string ExchangeFullName { get; set; }

        [JsonProperty("exchange")]
        public string Exchange { get; set; }

        [JsonProperty("industry")]
        public string Industry { get; set; }

        [JsonProperty("website")]
        public string Website { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("ceo")]
        public string Ceo { get; set; }

        [JsonProperty("sector")]
        public string Sector { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("fullTimeEmployees")]
        public string FullTimeEmployees { get; set; }

        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("zip")]
        public string Zip { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("ipoDate")]
        public string IpoDate { get; set; }

        [JsonProperty("defaultImage")]
        public bool DefaultImage { get; set; }

        [JsonProperty("isEtf")]
        public bool IsEtf { get; set; }

        [JsonProperty("isActivelyTrading")]
        public bool IsActivelyTrading { get; set; }

        [JsonProperty("isAdr")]
        public bool IsAdr { get; set; }

        [JsonProperty("isFund")]
        public bool IsFund { get; set; }
    }
}