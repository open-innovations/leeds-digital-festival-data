import pandas as pd
import functs.combine as com


def pre_clean(df):
    df.columns = df.columns.str.lower().str.replace(" ","_")
    df = df.fillna(pd.NA)
    df["date"] = pd.to_datetime(df["date"],format='%Y%m%d')
    df = df.set_index("date")
    return df

def pre_clean_org(df):
    df.index = pd.to_datetime(df.index,format='%Y-%m-%d')
    return df

def post_clean(df):
    df = df.fillna(0)
    return df


new_df = com.combine_dir("working\\website",pre=pre_clean,read_params={"thousands" : ",","skiprows" : 6})
df = com.combine_file_df("data\\social\\website.csv",new_df,pre_file=pre_clean_org,post=post_clean,read_params={"index_col" : "date"},write_path="data\\social\\website.csv")
print(df)


#df = pd.read_csv("working\website\Analytics All Web Site Data Open Data Report 20210101-20220927.csv",skiprows=6,thousands=",")
#org_df = pd.read_csv("data\\social\\website.csv",index_col="date")
#org_df.index = pd.to_datetime(org_df.index,format='%Y-%m-%d')

#df = new_df.combine_first(org_df)
#df.to_csv("data\\social\\website.csv")


