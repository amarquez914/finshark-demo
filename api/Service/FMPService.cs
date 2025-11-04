using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FMPService : IFMPService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var apiKey = _config["FMPKey"];
                HttpResponseMessage result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={apiKey}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<List<FMPStock>>(content) ?? new List<FMPStock>();
                    if (tasks.Any())
                    {
                        var stock = tasks.First();
                        if (stock is not null)
                        {
                            return stock.ToStockFromFMP();
                        }
                    }
                }
                return null;
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e);
                return null;
                // throw;
            }
        }
    }
}