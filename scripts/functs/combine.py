import pandas as pd
import os

def default_clean(df: pd.DataFrame) -> pd.DataFrame:
    return df

def combine_dfs(dfs: list[pd.DataFrame],pre=default_clean,post=default_clean,write_path=None) -> pd.DataFrame:
    clean_dfs = [pre(df) for df in dfs]
    combined_df = post(pd.concat(clean_dfs,ignore_index=False))

    if write_path is not None:
        combined_df.to_csv(write_path,index=True)

    return combined_df

def combine_dfs_first(dfs: list[pd.DataFrame],pre=default_clean,post=default_clean,write_path=None) -> pd.DataFrame:
    clean_dfs = [pre(df) for df in dfs]
    combined_df = pd.DataFrame()
    print(clean_dfs)
    for cdf in clean_dfs:
        combined_df = cdf.combine_first(combined_df)
    
    combined_df = post(combined_df)
    if write_path is not None:
        combined_df.to_csv(write_path,index=True)

    return combined_df

def combine_files(files: list[str],pre=default_clean,post=default_clean,read_params={},write_path=None) -> pd.DataFrame:
    dfs = read_csvs(files,read_params)  
    return combine_dfs_first(dfs,pre,post,write_path)

def combine_file_df(file: str, df: pd.DataFrame,pre_df=default_clean,pre_file=default_clean,post=default_clean,read_params={},write_path=None) -> pd.DataFrame:
    file_df = pd.read_csv(file,**read_params)
    file_df = pre_file(file_df)
    df = pre_df(df)
    return combine_dfs_first([file_df,df],post=post,write_path=write_path)

def combine_files_dfs(files: list[str],dfs: list[pd.DataFrame],pre=default_clean,post=default_clean,write_path=None) -> pd.DataFrame:
    all_dfs = dfs.extend(read_csvs(files))
    return combine_dfs(all_dfs,pre,post,write_path)

def combine_dir(dir: str,pre=default_clean,post=default_clean,read_params={},write_path=None) -> pd.DataFrame:
    files = dir_file_paths(dir)
    return combine_files(files,pre,post,read_params,write_path)

def read_csvs(files: list[str],read_params) -> list[pd.DataFrame]:
    dfs = []
    for csv_file in files:
        dfs.append(pd.read_csv(csv_file,**read_params))

    return dfs

def dir_file_paths(dir: str) -> list[str]:  
    return[os.path.join(dir,file) for file in os.listdir(dir) if file.endswith(".csv")]

def clean_file(path_in: str,path_out: str,clean=default_clean) -> pd.DataFrame:        
    return combine_files([path_in],pre=clean,write_path=path_out)

def clean_dir(path_in: str,path_out: str):
    for f in os.listdir(path_in):
        clean_file(os.path.join(path_in,f),os.path.join(path_out,f))


